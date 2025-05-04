import { create } from 'zustand';
import apiService from '@/app/services/apiService';

interface TransactionFeeStore {
  transactionFee: number;
  fetchFees: () => Promise<void>;
}

const useTransactinoFee = create<TransactionFeeStore>((set) => {
  return {
    transactionFee: 0,
    fetchFees: async () => {
      const response = await apiService.get('/api/settings/fees/?name=djangobnb_transaction_fee');
      set({ transactionFee: response.value})
    }
  }
})

export default useTransactinoFee