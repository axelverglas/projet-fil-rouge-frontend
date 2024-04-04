'use client'
import {Button} from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle
} from '@/components/ui/card'
import {Input} from '@/components/ui/input'
import {toast} from 'react-hot-toast'
import {
  FormField,
  Form,
  FormItem,
  FormControl,
  FormMessage,
  FormLabel
} from '@/components/ui/form'
import {useForm} from 'react-hook-form'
import {signIn} from 'next-auth/react'
import {useRouter} from 'next/navigation'
import {zodResolver} from '@hookform/resolvers/zod'
import * as z from 'zod'
import React from 'react'
import {Icons} from '@/components/icons'
import Link from 'next/link'

const FormSchema = z.object({
  username: z.string().min(1, "Nom d'utilisateur requis"),
  email: z.string().email('Email invalide'),
  password: z.string().min(1, 'Mot de passe requis')
})

export default function LoginForm() {
  const [isLoading, setIsLoading] = React.useState<boolean>(false)
  const router = useRouter()
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema)
  })

  async function onSubmit(data: z.infer<typeof FormSchema>) {
    setIsLoading(true)
    const {username, email, password} = data
    const res = await fetch(`http://127.0.0.1:5000/api/v1/user`, {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({username, email, password})
    })
    const result = await res.json()
    if (res.ok) {
      setIsLoading(false)
      toast.success('Inscription réussie')
      await signIn('credentials', {
        redirect: true,
        email,
        password
      })
    } else {
      setIsLoading(false)
      toast.error(result.error)
    }
  }

  return (
    <Card className="w-full max-w-sm">
      <CardHeader>
        <CardTitle className="text-2xl">S&apos;inscrire</CardTitle>
      </CardHeader>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="w-full space-y-4"
        >
          <CardContent className="grid gap-4">
            <FormField
              control={form.control}
              name="username"
              render={({field}) => (
                <FormItem>
                  <FormLabel>Nom d&apos;utilisateur</FormLabel>
                  <FormControl>
                    <Input placeholder="Votre nom d'utilisateur" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="email"
              render={({field}) => (
                <FormItem>
                  <FormLabel>Adresse Mail</FormLabel>
                  <FormControl>
                    <Input placeholder="Votre adresse mail" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="password"
              render={({field}) => (
                <FormItem>
                  <FormLabel>Mot de passe</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Votre mot de passe"
                      type="password"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button disabled={isLoading} className="w-full">
              {isLoading && (
                <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
              )}
              Inscription
            </Button>
            <div className="text-center text-sm">
              Vous n&apos;avez pas de compte ?{' '}
              <Link href="/auth/register" className="underline">
                S&apos;inscrire
              </Link>
            </div>
          </CardContent>
        </form>
      </Form>
    </Card>
  )
}
