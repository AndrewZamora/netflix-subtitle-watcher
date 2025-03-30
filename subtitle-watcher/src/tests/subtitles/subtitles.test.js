import { expect, describe, beforeEach, vi, test } from 'vitest';
import { createSubtitleDisplay } from '../../subtitles/createSubtitleDisplay';
import { updateSubtitleDisplay } from '../../subtitles/updateSubtitleDisplay';
import { getSubtitleContainer } from '../../subtitles/getSubtitleContainer';
import { createObserver } from '../../subtitles/createObserver';
import { tokenizeText } from '../../subtitles/tokenizeText';

describe('Subtitle Functions', () => {
    let mockDocument;
    let subtitleDisplay;


    const MutationObserverMock = vi.fn(() => ({
        disconnect: vi.fn(),
        observe: vi.fn(),
        takeRecords: vi.fn(),
        unobserve: vi.fn(),
    }))

    vi.stubGlobal('MutationObserver', MutationObserverMock)

    beforeEach(() => {
        mockDocument = {
            body: { appendChild: vi.fn(), innerHTML: '' },
            createElement: vi.fn(() => ({
                id: '',
                style: {},
                textContent: '',
            })),
            getElementById: vi.fn(() => subtitleDisplay),
            querySelector: vi.fn(() => null),
        };
        createSubtitleDisplay(mockDocument);
        subtitleDisplay = mockDocument.createElement();
    });

    test('createSubtitleDisplay creates a subtitle display div', () => {
        expect(mockDocument.createElement).toHaveBeenCalledWith('div');
        expect(mockDocument.body.appendChild).toHaveBeenCalled();
    });

    test('updateSubtitleDisplay updates the text content', () => {
        updateSubtitleDisplay('Test Subtitle', mockDocument);
        expect(subtitleDisplay.textContent).toBe('Test Subtitle');
    });

    test('getSubtitleContainer returns the correct element', () => {
        const mockQuerySelector = vi.fn((selector) => {
            if (selector === '.player-timedtext-text-container') {
                return { textContent: 'Subtitle' };
            }
            return null;
        });
        const container = getSubtitleContainer(mockQuerySelector);
        expect(container).not.toBeNull();
        expect(container.textContent).toBe('Subtitle');
    });

    test('observer updates the subtitle display when new subtitles appear', () => {
        const callback = vi.fn();
        const observer = createObserver(callback, mockDocument.body);
        expect(observer).toBeDefined();
    });

    test('tokenizeText splits Japanese text', () => {
        expect(tokenizeText('これは字幕です。')).toStrictEqual(['これ', 'は', '字幕', 'です', '。']);
    })
});
