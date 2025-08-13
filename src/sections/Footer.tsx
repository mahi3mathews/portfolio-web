type FooterProps = {
  isDarkTheme: boolean;
};
export function Footer({ isDarkTheme }: FooterProps) {
  return (
    <footer
      className={`py-8 ${isDarkTheme ? 'bg-black/20' : 'bg-white/20'} backdrop-blur-md border-t ${
        isDarkTheme ? 'border-white/10' : 'border-black/10'
      } relative z-10`}
    >
      <div className="max-w-6xl mx-auto px-4 text-center">
        <p className="opacity-70">
          Built and designed by Mahima Serah Mathews. All rights reserved. ©
        </p>
      </div>
    </footer>
  );
}
