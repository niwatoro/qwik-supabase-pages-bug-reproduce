import { component$ } from "@builder.io/qwik";
import { routeLoader$ } from "@builder.io/qwik-city";
import { createServerClient } from "supabase-auth-helpers-qwik";

export const useItems = routeLoader$(async (requestEv) => {
  const supabase = createServerClient(requestEv.env.get("VITE_SUPABASE_URL")!, requestEv.env.get("VITE_SUPABASE_ANON_KEY")!, requestEv);
  const { data: items } = await supabase.from("items").select("*");
  return items ?? [];
});

export default component$(() => {
  const items = useItems();

  return <div>You have {items.value.length} Items!</div>;
});
