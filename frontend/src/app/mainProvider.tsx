import ThemeRegistry from "./ThemeRegistry/ThemeRegistry";
export default function MainProvider({ children }: any) {
  return (
      <ThemeRegistry>{children}</ThemeRegistry>
  );
}
