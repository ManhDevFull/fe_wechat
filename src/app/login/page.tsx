import Link from "next/link";
import React from "react";

export default function LoginPage() {
  return (
    <div className="bg-gray-50 min-h-[calc(100vh-72px)] flex items-center justify-center px-4 py-12">
      <div
        className="-mt-30 w-full max-w-md rounded-2xl border border-gray-200 bg-[#00000005] p-8 shadow-lg"
        id="form-login"
      >
        <div className="space-y-2 text-center">
          <h1 className="text-2xl font-semibold text-gray-900">Đăng nhập</h1>
          <p className="text-sm text-gray-500">Chào mừng bạn quay lại {"<"}3</p>
        </div>

        <form className="mt-8 space-y-5">
          <div className="space-y-2">
            <label
              htmlFor="sdt"
              className="font-medium text-gray-700 text-sm"
            >
              Số điện thoại
            </label>
            <input
              id="sdt"
              name="sdt"
              placeholder="Số điện thoại"
              className="w-full rounded-lg border border-gray-300 px-4 py-3 text-sm text-gray-900 outline-none transition focus:border-gray-900 focus:ring-2 focus:ring-gray-900/10"
            />
          </div>

          <div className="space-y-2">
            <label
              htmlFor="password"
              className="text-sm font-medium text-gray-700"
            >
              Mật khẩu
            </label>
            <input
              id="password"
              name="password"
              type="password"
              placeholder="Nhập mật khẩu"
              className="w-full rounded-lg border border-gray-300 px-4 py-3 text-sm text-gray-900 outline-none transition focus:border-gray-900 focus:ring-2 focus:ring-gray-900/10"
            />
          </div>

          <div className="flex items-center justify-between text-sm">
            <label className="flex items-center gap-2 text-gray-600">
              <input
                type="checkbox"
                name="remember"
                className="h-4 w-4 rounded border-gray-300 text-gray-900 focus:ring-gray-900/20"
              />
              Ghi nhớ đăng nhập
            </label>
            <Link
              href="/forgot-password"
              className="font-medium text-gray-700 hover:text-gray-900"
            >
              Quên mật khẩu?
            </Link>
          </div>

          <button
            type="submit"
            className="w-full rounded-lg bg-gray-900 px-4 py-3 text-sm font-semibold text-white transition hover:bg-gray-800"
          >
            Đăng nhập
          </button>
        </form>

        <p className="mt-6 text-center text-sm text-gray-600">
          Chưa có tài khoản?{" "}
          <Link
            href="/register"
            className="font-semibold text-gray-900 hover:underline"
          >
            Đăng ký
          </Link>
        </p>
      </div>
    </div>
  );
}
