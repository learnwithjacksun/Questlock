import { AuthLayout } from "@/Layouts";

const OTP = () => {
  return (
    <>
      <AuthLayout>
        <form>
          <div className="min-h-[calc(100vh-80px)] md:min-h-[calc(100vh-200px)] flex md:justify-center justify-between pb-10 pt-6 flex-col md:max-w-[400px] gap-4 w-full mx-auto">
            <div className="space-y-4">
              <div className="border-b border-line pb-4">
                  <h3 className="text-xl font-sora">
                    Verify your e-mail address
                  </h3>
                  <p className="text-muted text-sm">A one-time password (OTP) was sent to the email you provided.</p>
              </div>
              <label htmlFor="email" className="text-xs text-muted">
                OTP <span className="text-red-500">*</span>
              </label>
              <div>
                <input
                  type="number"
                  placeholder="e.g 123456"
                  className="input w-full"
                />
              </div>
            </div>

            <button
              type="submit"
              className="btn-primary w-full h-10 rounded-md"
            >
              Verify
            </button>
          </div>
        </form>
      </AuthLayout>
    </>
  );
};

export default OTP;
