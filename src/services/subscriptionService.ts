import { UserSubscription, SubscriptionTier, BillingCycle } from '../types';

const STORAGE_KEY_SUBSCRIPTION = 'fasalsetu_user_subscription';
const FREE_DAILY_LIMIT = 5;

function getTodayString(): string {
  const d = new Date();
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;
}

const DEFAULT_SUBSCRIPTION: UserSubscription = {
  plan: 'free',
  billingCycle: null,
  status: 'active',
  startDate: new Date().toISOString(),
  renewalDate: null,
  cancelAtPeriodEnd: false,
  dailyComparisonsUsed: 0,
  lastComparisonDate: getTodayString(),
  paymentProvider: 'none',
};

export interface VerificationResult {
  success: boolean;
  orderId?: string;
  transactionId?: string;
  errorCode?: string;
  errorMessage?: string;
  verifiedAt?: string;
}

class SubscriptionService {
  private subscription: UserSubscription;

  constructor() {
    this.subscription = this.loadFromStorage();
  }

  private loadFromStorage(): UserSubscription {
    try {
      const data = localStorage.getItem(STORAGE_KEY_SUBSCRIPTION);
      if (data) {
        const parsed = JSON.parse(data) as UserSubscription;
        // Check for daily quota rollover
        const today = getTodayString();
        if (parsed.lastComparisonDate !== today) {
          parsed.dailyComparisonsUsed = 0;
          parsed.lastComparisonDate = today;
          localStorage.setItem(STORAGE_KEY_SUBSCRIPTION, JSON.stringify(parsed));
        }

        // Check for subscription expiry if applicable
        if (parsed.plan !== 'free' && parsed.renewalDate) {
          const expiryTime = new Date(parsed.renewalDate).getTime();
          const now = Date.now();
          if (now > expiryTime) {
            if (parsed.cancelAtPeriodEnd) {
              parsed.status = 'expired';
              parsed.plan = 'free'; // Downgrade to free upon non-renewal
            } else {
              parsed.status = 'grace_period'; // In grace period pending renewal
            }
            localStorage.setItem(STORAGE_KEY_SUBSCRIPTION, JSON.stringify(parsed));
          }
        }

        return parsed;
      }
    } catch (e) {
      console.warn('Could not read subscription from storage:', e);
    }
    return DEFAULT_SUBSCRIPTION;
  }

  public getSubscription(): UserSubscription {
    return { ...this.subscription };
  }

  private persist(sub: UserSubscription): void {
    this.subscription = sub;
    localStorage.setItem(STORAGE_KEY_SUBSCRIPTION, JSON.stringify(sub));
  }

  /**
   * Check if user is allowed to perform a comparison
   */
  public canPerformComparison(): { allowed: boolean; remaining: number; limit: number } {
    const today = getTodayString();
    if (this.subscription.lastComparisonDate !== today) {
      this.subscription.dailyComparisonsUsed = 0;
      this.subscription.lastComparisonDate = today;
      this.persist(this.subscription);
    }

    if (this.subscription.plan !== 'free' && this.subscription.status === 'active') {
      return { allowed: true, remaining: Infinity, limit: Infinity };
    }

    const remaining = Math.max(0, FREE_DAILY_LIMIT - this.subscription.dailyComparisonsUsed);
    return {
      allowed: remaining > 0,
      remaining,
      limit: FREE_DAILY_LIMIT,
    };
  }

  /**
   * Record that a comparison has been run
   */
  public recordComparison(): void {
    if (this.subscription.plan === 'free') {
      this.subscription.dailyComparisonsUsed += 1;
      this.subscription.lastComparisonDate = getTodayString();
      this.persist(this.subscription);
    }
  }

  /**
   * Simulated Secure Payment Verification Service
   * In a live deployment, this calls your backend endpoint (e.g. POST /api/verify-payment)
   * which validates Razorpay HMAC SHA256 signatures before provisioning the subscription.
   */
  public async verifyPayment(
    plan: SubscriptionTier,
    billingCycle: BillingCycle,
    amount: number,
    simulateFailure: boolean = false
  ): Promise<VerificationResult> {
    // Artificial latency for realistic gateway processing (1.2s)
    await new Promise(res => setTimeout(res, 1200));

    if (simulateFailure) {
      return {
        success: false,
        errorCode: 'BANK_DECLINED',
        errorMessage: 'The issuing bank declined this transaction. Please verify card balance or try UPI.',
      };
    }

    // Generate unique verifiable transaction IDs
    const orderId = `order_${Date.now().toString(36).toUpperCase()}`;
    const transactionId = `pay_razor_${Math.random().toString(36).substring(2, 10).toUpperCase()}`;

    // Calculate next renewal date (1 month or 1 year)
    const renewal = new Date();
    if (billingCycle === 'yearly') {
      renewal.setFullYear(renewal.getFullYear() + 1);
    } else {
      renewal.setMonth(renewal.getMonth() + 1);
    }

    const updated: UserSubscription = {
      plan,
      billingCycle,
      status: 'active',
      startDate: new Date().toISOString(),
      renewalDate: renewal.toISOString(),
      cancelAtPeriodEnd: false,
      dailyComparisonsUsed: 0,
      lastComparisonDate: getTodayString(),
      paymentProvider: 'sandbox_test',
      lastTransactionId: transactionId,
      lastPaymentAmount: amount,
    };

    this.persist(updated);

    return {
      success: true,
      orderId,
      transactionId,
      verifiedAt: new Date().toISOString(),
    };
  }

  /**
   * Cancel subscription auto-renewal
   */
  public cancelAutoRenewal(): UserSubscription {
    const updated: UserSubscription = {
      ...this.subscription,
      cancelAtPeriodEnd: true,
      status: 'cancelled',
    };
    this.persist(updated);
    return updated;
  }

  /**
   * Reactivate cancelled subscription
   */
  public reactivateAutoRenewal(): UserSubscription {
    const updated: UserSubscription = {
      ...this.subscription,
      cancelAtPeriodEnd: false,
      status: 'active',
    };
    this.persist(updated);
    return updated;
  }

  /**
   * Downgrade immediately to Free plan
   */
  public downgradeToFree(): UserSubscription {
    const updated: UserSubscription = {
      ...DEFAULT_SUBSCRIPTION,
      startDate: new Date().toISOString(),
      lastComparisonDate: getTodayString(),
    };
    this.persist(updated);
    return updated;
  }

  /**
   * Testing Helper: Toggle specific state for QA & hackathon demonstrations
   */
  public setMockState(state: 'free' | 'plus_active' | 'fpo_active' | 'expired' | 'limit_exhausted'): UserSubscription {
    const today = getTodayString();
    let updated: UserSubscription;

    switch (state) {
      case 'free':
        updated = {
          ...DEFAULT_SUBSCRIPTION,
          dailyComparisonsUsed: 1,
          lastComparisonDate: today,
        };
        break;
      case 'limit_exhausted':
        updated = {
          ...DEFAULT_SUBSCRIPTION,
          dailyComparisonsUsed: FREE_DAILY_LIMIT,
          lastComparisonDate: today,
        };
        break;
      case 'plus_active':
        const nextMonth = new Date();
        nextMonth.setMonth(nextMonth.getMonth() + 1);
        updated = {
          plan: 'plus',
          billingCycle: 'monthly',
          status: 'active',
          startDate: new Date().toISOString(),
          renewalDate: nextMonth.toISOString(),
          cancelAtPeriodEnd: false,
          dailyComparisonsUsed: 0,
          lastComparisonDate: today,
          paymentProvider: 'sandbox_test',
          lastTransactionId: 'pay_test_plus_demo',
          lastPaymentAmount: 29,
        };
        break;
      case 'fpo_active':
        const nextYear = new Date();
        nextYear.setFullYear(nextYear.getFullYear() + 1);
        updated = {
          plan: 'fpo',
          billingCycle: 'yearly',
          status: 'active',
          startDate: new Date().toISOString(),
          renewalDate: nextYear.toISOString(),
          cancelAtPeriodEnd: false,
          dailyComparisonsUsed: 0,
          lastComparisonDate: today,
          paymentProvider: 'sandbox_test',
          lastTransactionId: 'pay_test_fpo_demo',
          lastPaymentAmount: 9999,
        };
        break;
      case 'expired':
        const pastDate = new Date();
        pastDate.setDate(pastDate.getDate() - 3);
        updated = {
          plan: 'plus',
          billingCycle: 'monthly',
          status: 'expired',
          startDate: new Date(Date.now() - 33 * 86400000).toISOString(),
          renewalDate: pastDate.toISOString(),
          cancelAtPeriodEnd: true,
          dailyComparisonsUsed: 5,
          lastComparisonDate: today,
          paymentProvider: 'sandbox_test',
        };
        break;
    }

    this.persist(updated);
    return updated;
  }
}

export const subscriptionService = new SubscriptionService();
