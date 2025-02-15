import { expect, test, describe } from 'bun:test';
import { HTMLEscaperService } from './html-escaper-service';

describe('HTMLEscaperService', () => {
  describe('escapeHtml', () => {
    test('should escape & to &amp;', () => {
      const input = 'Fish & Chips';
      const expected = 'Fish &amp; Chips';
      const result = HTMLEscaperService.escapeHtml(input);
      expect(result).toBe(expected);
    });

    test('should escape < to &lt;', () => {
      const input = '<div>';
      const expected = '&lt;div&gt;';
      const result = HTMLEscaperService.escapeHtml(input);
      expect(result).toBe(expected);
    });

    test('should escape > to &gt;', () => {
      const input = '1 > 0';
      const expected = '1 &gt; 0';
      const result = HTMLEscaperService.escapeHtml(input);
      expect(result).toBe(expected);
    });

    test('should escape " to &quot;', () => {
      const input = '"Hello"';
      const expected = '&quot;Hello&quot;';
      const result = HTMLEscaperService.escapeHtml(input);
      expect(result).toBe(expected);
    });

    test("should escape ' to &apos;", () => {
      const input = "It's a test";
      const expected = 'It&apos;s a test';
      const result = HTMLEscaperService.escapeHtml(input);
      expect(result).toBe(expected);
    });

    test('should escape / to &#x2F;', () => {
      const input = '/path/to/resource';
      const expected = '&#x2F;path&#x2F;to&#x2F;resource';
      const result = HTMLEscaperService.escapeHtml(input);
      expect(result).toBe(expected);
    });

    test('should escape ` to &grave;', () => {
      const input = '`code`';
      const expected = '&grave;code&grave;';
      const result = HTMLEscaperService.escapeHtml(input);
      expect(result).toBe(expected);
    });

    test('should escape = to &#x3D;', () => {
      const input = 'a=b';
      const expected = 'a&#x3D;b';
      const result = HTMLEscaperService.escapeHtml(input);
      expect(result).toBe(expected);
    });

    test('should escape multiple characters', () => {
      const input = '<div class="test">Hello & Welcome</div>';
      const expected =
        '&lt;div class&#x3D;&quot;test&quot;&gt;Hello &amp; Welcome&lt;&#x2F;div&gt;';
      const result = HTMLEscaperService.escapeHtml(input);
      expect(result).toBe(expected);
    });
  });
});
