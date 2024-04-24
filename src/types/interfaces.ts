export interface KPInfo {
  id: string;
  title: string;
  description: string;
  datePublished: Date;
  author: string;
  fileType: string;
  kpType: string;
  downloadURl: string;
}

export interface KPTableProps {
  info: KPInfo[];
}

export interface UserInfo {
  id: string;
  lastName: string;
  firstName: string;
  gender: string;
  email: string;
  phone: number;
  address: string;
  occupation: string;
  institution: string;
  kpId: string;
  kpTitle: string;
  dateDownloaded: Date;
  reason: string;
}

export interface UserTableProps {
  info: UserInfo[];
}