import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, email, clinicUrl } = body;

    if (!name || !email || !clinicUrl) {
      return NextResponse.json(
        { error: 'Nome, email e URL della clinica sono richiesti' },
        { status: 400 }
      );
    }

    // Mock realistic database save delay
    await new Promise((resolve) => setTimeout(resolve, 1000));

    // In a real scenario, you'd save this to a database like PostgreSQL or MongoDB
    console.log('Lead saved:', { name, email, clinicUrl });

    return NextResponse.json({
      success: true,
      message: 'Richiesta di report completo ricevuta. Ti contatteremo presto.'
    });
  } catch (error) {
    return NextResponse.json(
      { error: 'Errore interno del server' },
      { status: 500 }
    );
  }
}
