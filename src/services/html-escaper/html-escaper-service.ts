export class HTMLEscaperService {
  private static readonly ESCAPE_MAP: { [key: string]: string } = {
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&apos;',
    '/': '&#x2F;',
    '`': '&grave;',
    '=': '&#x3D;',
  };

  escapeHtml(text: string): string {
    return text.replace(/[&<>"'`=\/]/g, s => HTMLEscaperService.ESCAPE_MAP[s]);
  }
}
