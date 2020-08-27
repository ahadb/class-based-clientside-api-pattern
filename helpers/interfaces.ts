export interface BaseRequest<T> {
    request: keyof T;
    body: string;
}

export interface MyParameters<T> {
  sort?: String;
}
