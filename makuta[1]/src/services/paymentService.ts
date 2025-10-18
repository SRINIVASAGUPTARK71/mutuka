// Payment service for handling API calls
export interface PaymentItem {
  id: string;
  reason: string;
  itemCount: number;
  skipped: number;
  success: number;
  failed: number;
  usdAmount: string;
  cdfAmount: string;
  createdAt: string;
  updatedAt: string;
  status: string;
}

export interface PaymentListParams {
  page?: number;
  limit?: number;
  sortBy?: string;
  sortOrder?: 'asc' | 'desc' | null;
  search?: string;
  filters?: Record<string, string | number | boolean>;
}

export interface PaymentListResponse {
  data: PaymentItem[];
  total: number;
  page: number;
  limit: number;
}

class PaymentService {
  private baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL || '/api';

  async getPayments(params: PaymentListParams = {}): Promise<PaymentListResponse> {
    const queryParams = new URLSearchParams();
    
    if (params.page) queryParams.set('page', params.page.toString());
    if (params.limit) queryParams.set('limit', params.limit.toString());
    if (params.sortBy) queryParams.set('sortBy', params.sortBy);
    if (params.sortOrder) queryParams.set('sortOrder', params.sortOrder);
    if (params.search) queryParams.set('search', params.search);

    // Add filters
    if (params.filters) {
      Object.entries(params.filters).forEach(([key, value]) => {
        if (value !== undefined && value !== null) {
          queryParams.set(key, value.toString());
        }
      });
    }

    const url = `${this.baseUrl}/payments?${queryParams.toString()}`;
    
    const response = await fetch(url, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        // Add authentication headers here if needed
        // 'Authorization': `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      throw new Error(`API Error: ${response.status} ${response.statusText}`);
    }

    return response.json();
  }

  async getSortedPayments(sortBy: string, sortOrder: 'asc' | 'desc' | null): Promise<PaymentItem[]> {
    const params: PaymentListParams = {
      sortBy,
      sortOrder,
    };

    const response = await this.getPayments(params);
    return response.data;
  }
}

export const paymentService = new PaymentService();
