export interface ValInfo {
  valname: string;
  username: string;
}

export type ValData = {
  id: string;
  author: {
    id: string;
    username: string;
  };
  name: string;
  code: string;
  public: boolean;
  version: number;
  runStartAt: string;
  runEndAt: string;
  logs: any[];
  output: {
    type: string;
    value: string;
  };
  error: null | string;
  readme: null | string;
  likeCount: number;
  referenceCount: number;
};
