import { t, getLocale, setLocale } from '../src/i18n';

describe('i18n functionality', () => {
  it('uses default locale (mocked as English)', () => {
    expect(getLocale()).toBe('en');
  });

  it('returns a translated value instead of the key', () => {
    const result = t('countryList.title');
    expect(result).not.toBe('countryList.title');
  });

  it('changes language when calling setLocale', () => {
    const before = t('settings.title');
    setLocale('es');
    const after = t('settings.title');

    expect(getLocale()).toBe('es');
    expect(after).not.toBe(before);
  });

  it('returns the key if translation is missing', () => {
    const result = t('non.existent.key');
    expect(result).toBe('non.existent.key');
  });
});
