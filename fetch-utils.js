const SUPABASE_URL = 'https://qibydbafeplthyrhkgog.supabase.co';
const SUPABASE_KEY =
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InFpYnlkYmFmZXBsdGh5cmhrZ29nIiwicm9sZSI6ImFub24iLCJpYXQiOjE2NjgxMDgwOTIsImV4cCI6MTk4MzY4NDA5Mn0.NrtQcuaIUkk_9z8xEvXMdOg-GqBQaeDdi3tGUQcDCQc';
const client = supabase.createClient(SUPABASE_URL, SUPABASE_KEY);

/* Auth related functions */

export function getUser() {
    return client.auth.user();
}

export async function signUpUser(email, password) {
    return await client.auth.signUp({
        email,
        password,
    });
}

export async function signInUser(email, password) {
    return await client.auth.signIn({
        email,
        password,
    });
}

export async function signOutUser() {
    return await client.auth.signOut();
}

/* Data functions */
// create function for form to take in item name and quantity and insert into Supabase table
export async function createListItem(item, quantity) {
    const response = await client.from('shopping_list').insert({ item, quantity });

    // error handling
    if (response.error) {
        console.error(response.error.message);
    } else {
        return response.data;
    }
}

// create function to get list items
export async function getListItems() {
    const response = await client.from('favorite').select('*').match({ user_id: getUser().id });

    // error handling
    if (response.error) {
        console.error(response.error.message);
    } else {
        return response.data;
    }
}
