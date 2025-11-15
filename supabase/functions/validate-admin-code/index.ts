import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.81.1';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

Deno.serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { adminCode, userId, role } = await req.json();

    console.log('Validating admin code for user:', userId);

    // Validate input
    if (!adminCode || !userId || role !== 'admin') {
      return new Response(
        JSON.stringify({ valid: false, error: 'Invalid request parameters' }),
        { headers: { ...corsHeaders, 'Content-Type': 'application/json' }, status: 400 }
      );
    }

    // Get the admin code from environment variable
    const validAdminCode = Deno.env.get('ADMIN_CODE');
    
    if (!validAdminCode) {
      console.error('ADMIN_CODE environment variable not set');
      return new Response(
        JSON.stringify({ valid: false, error: 'Server configuration error' }),
        { headers: { ...corsHeaders, 'Content-Type': 'application/json' }, status: 500 }
      );
    }

    // Validate the code
    const isValid = adminCode === validAdminCode;

    if (!isValid) {
      console.log('Invalid admin code provided');
      return new Response(
        JSON.stringify({ valid: false, error: 'Invalid admin code' }),
        { headers: { ...corsHeaders, 'Content-Type': 'application/json' }, status: 401 }
      );
    }

    // Create Supabase client with service role to update roles
    const supabaseUrl = Deno.env.get('SUPABASE_URL')!;
    const supabaseServiceKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!;
    const supabase = createClient(supabaseUrl, supabaseServiceKey);

    // Update the user's profile role to admin
    const { error: profileError } = await supabase
      .from('profiles')
      .update({ role: 'admin' })
      .eq('id', userId);

    if (profileError) {
      console.error('Error updating profile:', profileError);
      return new Response(
        JSON.stringify({ valid: false, error: 'Failed to update user role' }),
        { headers: { ...corsHeaders, 'Content-Type': 'application/json' }, status: 500 }
      );
    }

    // Update the user_roles table
    const { error: roleError } = await supabase
      .from('user_roles')
      .update({ role: 'admin' })
      .eq('user_id', userId);

    if (roleError) {
      console.error('Error updating user_roles:', roleError);
      return new Response(
        JSON.stringify({ valid: false, error: 'Failed to update user role' }),
        { headers: { ...corsHeaders, 'Content-Type': 'application/json' }, status: 500 }
      );
    }

    console.log('Admin code validated successfully for user:', userId);

    return new Response(
      JSON.stringify({ valid: true }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' }, status: 200 }
    );

  } catch (error) {
    console.error('Error in validate-admin-code function:', error);
    return new Response(
      JSON.stringify({ valid: false, error: 'Internal server error' }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' }, status: 500 }
    );
  }
});
