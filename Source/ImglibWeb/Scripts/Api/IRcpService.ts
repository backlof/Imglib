
interface IRcpService {
	post<TIn, TOut>(data: TIn, controller: string, method: string): JQueryDeferred<TOut>;
	get<TIn>(data: TIn, controller: string, method: string): JQueryDeferred<void>;
}