
export interface CategoryBreakdown {
  category: string;
  value: number;
  unit: 'USD' | 'requests' | 'hours';
}

export interface ImpactReportData {
  reportTitle: string;
  executiveSummary: string;
  keyMetrics: {
    totalDonations: number;
    requestsFulfilled: number;
    volunteerHours: number;
  };
  donationsByCategory: CategoryBreakdown[];
  requestsByCategory: CategoryBreakdown[];
  volunteerHoursByCategory: CategoryBreakdown[];
  achievements: string[];
  suggestions: string[];
}
