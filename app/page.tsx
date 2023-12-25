import { PayuSecureForm } from "@/components/PayuSecureForm";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center p-8 sm:p-16 md:p-24">
      <div className="z-10 max-w-5xl w-full items-center font-mono text-sm lg:flex">
        <div>
          <h1 className="text-lg">PayU Secure Form</h1>
          <p className="mb-12">
            <a
              className="text-xs"
              href="https://developers.payu.com/europe/pl/docs/checkout/secure-form/"
            >
              developers.payu.com/europe/pl/docs/checkout/secure-form
            </a>
          </p>
        </div>
      </div>
      <div className="z-10 max-w-5xl w-full items-center font-mono text-sm lg:flex">
        <PayuSecureForm />
      </div>
    </main>
  );
}
