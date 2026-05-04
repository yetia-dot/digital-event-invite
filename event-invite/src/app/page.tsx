import { supabase } from '@/lib/supabase'

export default async function Home() {
  const { data, error } = await supabase.from('events').select('*')

  if (error) {
    return <p>Error: {error.message}</p>
  }

  return (
    <main className="p-8">
      <h1 className="text-2xl font-bold mb-4">Connection Test</h1>
      <pre>{JSON.stringify(data, null, 2)}</pre>
    </main>
  )
}