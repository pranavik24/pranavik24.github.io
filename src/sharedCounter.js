const SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL;
const SUPABASE_ANON_KEY = import.meta.env.VITE_SUPABASE_ANON_KEY;
const COUNTER_KEY = 'fun_listens';

const supabaseHeaders = {
  apikey: SUPABASE_ANON_KEY,
  Authorization: `Bearer ${SUPABASE_ANON_KEY}`,
  'Content-Type': 'application/json',
};

export const hasSharedCounter = Boolean(SUPABASE_URL && SUPABASE_ANON_KEY);

export async function getFunListens() {
  if (!hasSharedCounter) {
    return null;
  }

  const response = await fetch(
    `${SUPABASE_URL}/rest/v1/portfolio_counters?key=eq.${COUNTER_KEY}&select=value`,
    { headers: supabaseHeaders },
  );

  if (!response.ok) {
    throw new Error('Unable to load shared listen count');
  }

  const rows = await response.json();
  return Number(rows[0]?.value || 0);
}

export async function incrementFunListens() {
  if (!hasSharedCounter) {
    return null;
  }

  const response = await fetch(`${SUPABASE_URL}/rest/v1/rpc/increment_portfolio_counter`, {
    method: 'POST',
    headers: supabaseHeaders,
    body: JSON.stringify({ counter_key: COUNTER_KEY }),
  });

  if (!response.ok) {
    throw new Error('Unable to update shared listen count');
  }

  return Number(await response.json());
}
