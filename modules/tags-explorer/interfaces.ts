export interface Data {
  items: DataItem[];
  has_more: boolean;
  quota_max: number;
  quota_remaining: number;
  total: number;
}

export interface DataItem {
  name: string;
  count: number;
}
