export interface KPInfo {
  id: string;
  title: string;
  description: string;
  datePublished: string;
  author: string;
  fileType: string;
  kpType: string;
  timeUploaded: string;
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
  kpID: string;
  kpTitle: string;
  timeDownloaded: Date;
  reason: string;
}

export interface UserTableProps {
  info: UserInfo[];
}

export interface RKPInfo {
  author: string;
  datePublished: string;
  kpType: string;
  title: string;
  description: string;
}

export interface UploadData {
  kp: File; 
  cover: File;
}