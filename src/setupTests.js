
import '@testing-library/jest-dom';

// Mock para o localStorage
const localStorageMock = (function() {
  let store = {};
  return {
    getItem: function(key) {
      return store[key] || null;
    },
    setItem: function(key, value) {
      store[key] = value.toString();
    },
    clear: function() {
      store = {};
    },
    removeItem: function(key) {
      delete store[key];
    }
  };
})();

Object.defineProperty(window, 'localStorage', {
  value: localStorageMock
});

// Mock para as variáveis de estilo
Object.defineProperty(document.documentElement, 'style', {
  value: {
    setProperty: jest.fn(),
    getPropertyValue: jest.fn(),
    removeProperty: jest.fn()
  },
  writable: true
});

Object.defineProperty(document.body, 'style', {
  value: {
    setProperty: jest.fn(),
    getPropertyValue: jest.fn(),
    removeProperty: jest.fn()
  },
  writable: true
});

// Mock para o dispatchEvent
window.dispatchEvent = jest.fn();

// Mock para CustomEvent
window.CustomEvent = class MockCustomEvent {
  constructor(event, params) {
    this.type = event;
    this.detail = params?.detail;
  }
};

// Limpar todos os mocks após cada teste
afterEach(() => {
  jest.clearAllMocks();
});
