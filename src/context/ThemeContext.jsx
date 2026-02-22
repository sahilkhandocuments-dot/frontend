import React, { createContext, useContext, useReducer, useEffect } from 'react';

const ThemeContext = createContext();

// Theme reducer
const themeReducer = (state, action) => {
  switch (action.type) {
    case 'TOGGLE_THEME':
      return {
        ...state,
        isDark: !state.isDark,
      };
    case 'SET_THEME':
      return {
        ...state,
        isDark: action.payload,
      };
    case 'SET_PRIMARY_COLOR':
      return {
        ...state,
        primaryColor: action.payload,
      };
    case 'SET_ACCENT_COLOR':
      return {
        ...state,
        accentColor: action.payload,
      };
    case 'SET_FONT_SIZE':
      return {
        ...state,
        fontSize: action.payload,
      };
    case 'RESET_THEME':
      return {
        isDark: false,
        primaryColor: 'blue',
        accentColor: 'purple',
        fontSize: 'medium',
        animations: true,
      };
    default:
      return state;
  }
};

// Initial theme state
const initialThemeState = {
  isDark: false,
  primaryColor: 'blue',
  accentColor: 'purple',
  fontSize: 'medium',
  animations: true,
};

export const ThemeProvider = ({ children }) => {
  const [state, dispatch] = useReducer(themeReducer, initialThemeState);

  // Load theme from localStorage on mount
  useEffect(() => {
    const savedTheme = localStorage.getItem('eventx-theme');
    if (savedTheme) {
      try {
        const parsedTheme = JSON.parse(savedTheme);
        Object.entries(parsedTheme).forEach(([key, value]) => {
          if (key === 'isDark') {
            dispatch({ type: 'SET_THEME', payload: value });
          } else if (key === 'primaryColor') {
            dispatch({ type: 'SET_PRIMARY_COLOR', payload: value });
          } else if (key === 'accentColor') {
            dispatch({ type: 'SET_ACCENT_COLOR', payload: value });
          } else if (key === 'fontSize') {
            dispatch({ type: 'SET_FONT_SIZE', payload: value });
          }
        });
      } catch (error) {
        console.error('Failed to parse saved theme:', error);
      }
    }
  }, []);

  // Save theme to localStorage whenever state changes
  useEffect(() => {
    localStorage.setItem('eventx-theme', JSON.stringify(state));
    
    // Apply theme to document
    const root = document.documentElement;
    
    // Set dark mode
    if (state.isDark) {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }
    
    // Set CSS custom properties for dynamic theming
    const colorMap = {
      blue: {
        50: '#eff6ff',
        100: '#dbeafe',
        500: '#3b82f6',
        600: '#2563eb',
        700: '#1d4ed8',
        900: '#1e3a8a',
      },
      purple: {
        50: '#faf5ff',
        100: '#f3e8ff',
        500: '#8b5cf6',
        600: '#7c3aed',
        700: '#6d28d9',
        900: '#581c87',
      },
      green: {
        50: '#f0fdf4',
        100: '#dcfce7',
        500: '#22c55e',
        600: '#16a34a',
        700: '#15803d',
        900: '#14532d',
      },
      red: {
        50: '#fef2f2',
        100: '#fee2e2',
        500: '#ef4444',
        600: '#dc2626',
        700: '#b91c1c',
        900: '#7f1d1d',
      },
    };
    
    const primaryColors = colorMap[state.primaryColor] || colorMap.blue;
    const accentColors = colorMap[state.accentColor] || colorMap.purple;
    
    root.style.setProperty('--color-primary-50', primaryColors[50]);
    root.style.setProperty('--color-primary-100', primaryColors[100]);
    root.style.setProperty('--color-primary-500', primaryColors[500]);
    root.style.setProperty('--color-primary-600', primaryColors[600]);
    root.style.setProperty('--color-primary-700', primaryColors[700]);
    root.style.setProperty('--color-primary-900', primaryColors[900]);
    
    root.style.setProperty('--color-accent-50', accentColors[50]);
    root.style.setProperty('--color-accent-100', accentColors[100]);
    root.style.setProperty('--color-accent-500', accentColors[500]);
    root.style.setProperty('--color-accent-600', accentColors[600]);
    root.style.setProperty('--color-accent-700', accentColors[700]);
    root.style.setProperty('--color-accent-900', accentColors[900]);
    
    // Set font size
    const fontSizeMap = {
      small: '14px',
      medium: '16px',
      large: '18px',
    };
    root.style.setProperty('--font-size-base', fontSizeMap[state.fontSize] || fontSizeMap.medium);
  }, [state]);

  const toggleTheme = () => {
    dispatch({ type: 'TOGGLE_THEME' });
  };

  const setTheme = (isDark) => {
    dispatch({ type: 'SET_THEME', payload: isDark });
  };

  const setPrimaryColor = (color) => {
    dispatch({ type: 'SET_PRIMARY_COLOR', payload: color });
  };

  const setAccentColor = (color) => {
    dispatch({ type: 'SET_ACCENT_COLOR', payload: color });
  };

  const setFontSize = (size) => {
    dispatch({ type: 'SET_FONT_SIZE', payload: size });
  };

  const resetTheme = () => {
    dispatch({ type: 'RESET_THEME' });
  };

  const value = {
    ...state,
    toggleTheme,
    setTheme,
    setPrimaryColor,
    setAccentColor,
    setFontSize,
    resetTheme,
  };

  return (
    <ThemeContext.Provider value={value}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};

export default ThemeContext;