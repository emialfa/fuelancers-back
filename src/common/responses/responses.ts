export function ResponseOK(message: string, code = 200) {
  return {
    success: true,
    message: message,
    code: code,
  };
}

export function ResponseError(message: string, code = 404) {
  return {
    error: true,
    message: message,
    code: code,
  };
}
