'use client'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { userSchema, UserFormData } from '@/schemas/user.schema'

export default function Register() {
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<UserFormData>({
    resolver: zodResolver(userSchema),
    mode: 'onChange',
  })

  const onSubmit = handleSubmit(async (data) => {
    const response = await fetch('/api/auth/register', {
      method: 'POST',
      body: JSON.stringify({
        username: data.username,
        email: data.email,
        password: data.password,
      }),
      headers: {
        'Content-Type': 'application/json',
      },
    })

    const responseJSON = await response.json()

    console.log(responseJSON)
  })

  return (
    <div>
      <form
        onSubmit={onSubmit}
        className="flex flex-col gap-2 items-center mt-5 max-w-sm mx-auto"
      >
        <h2 className="text-gray-900 font-semibold text-4xl">Register</h2>

        <div className="flex flex-col gap-1 w-full">
          <label htmlFor="username" className="text-slate-600">
            Nombre de usuario
          </label>

          <input
            type="text"
            placeholder="miUsuario123"
            autoComplete="username"
            {...register('username')}
            className="bg-slate-300 rounded-md p-1 border-[1px] border-slate-500 w-full"
          />

          {errors.username && (
            <span className="text-red-500 text-xs">
              {errors.username.message}
            </span>
          )}
        </div>

        <div className="flex flex-col gap-1 w-full">
          <label htmlFor="email" className="text-slate-600">
            Correo
          </label>

          <input
            type="email"
            placeholder="example@email.com"
            autoComplete="email"
            {...register('email')}
            className="bg-slate-300 rounded-md p-1 border-[1px] border-slate-500 w-full"
          />

          {errors.email && (
            <span className="text-red-500 text-xs">{errors.email.message}</span>
          )}
        </div>

        <div className="flex flex-col gap-1 w-full">
          <label htmlFor="password" className="text-slate-600">
            Contraseña
          </label>

          <input
            type="password"
            placeholder="********"
            autoComplete="new-password"
            {...register('password')}
            className="bg-slate-300 rounded-md p-1 border-[1px] border-slate-500 w-full"
          />

          {errors.password && (
            <span className="text-red-500 text-xs">
              {errors.password.message}
            </span>
          )}
        </div>

        <button
          disabled={!isValid}
          className="bg-blue-500 text-white py-1 rounded-md cursor-pointer w-full disabled:bg-gray-400 disabled:cursor-not-allowed"
        >
          Registrar
        </button>
      </form>
    </div>
  )
}
