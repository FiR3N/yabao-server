export default class ApiError extends Error {
  status: number;
  errors: any[];

  constructor(_status: number, _message: string, errors: any[]) {
    super(_message);
    this.status = _status;
    this.errors = errors;
  }
  static BadRequest(message: string, errors: any[]) {
    return new ApiError(400, message, errors);
  }
  static UnauthorizerError() {
    return new ApiError(401, "Пользователь не авторизован", []);
  }
}
