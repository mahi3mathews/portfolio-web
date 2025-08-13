import { useEffect, useState } from "react";

type ToggleProps = {
    setTheme: (theme: string) => void;
    theme: string;
};

export function Toggle({ setTheme, theme = "DARK" }: ToggleProps) {
    const [isDarkTheme, setDarkTheme] = useState(theme === "DARK");

    useEffect(() => {
        setTheme(isDarkTheme ? "DARK" : "LIGHT");
    }, [isDarkTheme, setTheme]);

    const onToggle = () => {
        setDarkTheme((prevState) => !prevState);
    };
    return (
        <div className='theme-toggle' id='themeToggle'>
            <div className='toggle-slider' onClick={onToggle}>
                {isDarkTheme ? "🌙" : "☀️"}
            </div>
        </div>
    );
}
