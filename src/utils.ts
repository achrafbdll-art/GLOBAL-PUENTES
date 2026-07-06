/**
 * Safely parses response to JSON, verifying that it is indeed application/json.
 * If not, throws a descriptive error to avoid "Unexpected token '<' / 'T'" crashes.
 */
export async function safeJson(res: Response): Promise<any> {
  const contentType = res.headers.get("content-type");
  if (!contentType || !contentType.includes("application/json")) {
    const text = await res.text();
    console.error("Non-JSON response received:", text.substring(0, 200));
    throw new Error("El servidor temporalmente no se encuentra disponible (mantenimiento o reinicio). Por favor, intente de nuevo en unos segundos.");
  }
  return res.json();
}
