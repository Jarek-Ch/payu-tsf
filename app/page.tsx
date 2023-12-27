import { PayuSecureForm } from "@/components/PayuSecureForm";
import Image from "next/image";
export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center p-8 sm:p-16 md:p-24">
      <div className="w-full max-w-5xl items-center font-mono text-sm">
        <h1 className="text-lg">
          <Image alt="Logo PayU" src="/payu.svg" width="32" height="32"></Image>
          PayU Secure Form
        </h1>
        <p className="mb-12">
          <a
            className="break-words text-xs"
            href="https://developers.payu.com/europe/pl/docs/checkout/secure-form/"
          >
            developers.payu.com/europe/pl/docs/checkout/secure-form
          </a>
        </p>
      </div>
      <div className="w-full max-w-5xl items-center font-mono text-sm">
        <PayuSecureForm />
      </div>
    </main>
  );
}
