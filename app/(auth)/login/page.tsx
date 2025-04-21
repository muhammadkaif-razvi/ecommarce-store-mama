import { LoginForm } from "@/components/auth/LoginForm";

export default function LoginPage() {
  return (
    <div className="flex lg:min-h-[92vh] min-h-[100vh] md:min-h-[96vh] lg:mt-14 mt-11  flex-col items-center justify-center p-6 md:p-10 bg-blue-50 dark:bg-gray-900"      style={{
      backgroundImage: 'url(/Vector.png), url(/Vector-2.png)',
      backgroundSize: 'auto, auto', // Keep original sizes (or set custom, e.g., '200px, 300px')
      backgroundRepeat: 'no-repeat',
      backgroundPosition: 'left 10% top -20%, right 10% bottom -10%', // Adjust % for positioning
      width: '100vw',
    }}
  >
      <div className="w-full max-w-sm md:max-w-3xl">
        <LoginForm />
      </div>
    </div>
  );
}
