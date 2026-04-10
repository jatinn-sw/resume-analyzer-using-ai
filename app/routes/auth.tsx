import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router";
import { usePuterStore } from "~/lib/puter";

export const meta = () => ([
    { title: 'Lumen | Auth' },
    { name: 'description', content: 'Login to your account' },
])

const auth = () => {
    const { isLoading, auth } = usePuterStore();
    const location = useLocation();
    const next = location.search.split('next=')[1];
    const navigate = useNavigate();

    useEffect(() => {
        if(auth.isAuthenticated) navigate(next);
    }, [auth.isAuthenticated, next])

    return (
        <main className="bg-[url('/images/bg-dark.svg')] bg-cover min-h-screen flex items-center justify-center relative overflow-hidden">
            {/* Animated aurora glow behind the card */}
            <div
                className="absolute inset-0 pointer-events-none"
                style={{
                    background: 'radial-gradient(ellipse at 50% 50%, rgba(0, 212, 170, 0.08) 0%, transparent 60%)',
                }}
            />

            <div className="gradient-border shadow-lg relative z-10" style={{ boxShadow: '0 12px 40px rgba(0, 212, 170, 0.08)' }}>
                <section className="flex flex-col gap-8 rounded-2xl p-10" style={{ background: 'rgba(255, 255, 255, 0.04)', backdropFilter: 'blur(16px)' }}>
                    <div className="flex flex-col items-center gap-2 text-center">
                        <h1>Welcome</h1>
                        <h2>Log In to Continue</h2>
                    </div>
                    <div>
                        {isLoading ? (
                            <button className="auth-button animate-pulse">
                                <p>Signing you in...</p>
                            </button>
                        ) : (
                            <>
                                {auth.isAuthenticated ? (
                                    <button className="auth-button" onClick={auth.signOut}>
                                        <p>Log Out</p>
                                    </button>
                                ) : (
                                    <button className="auth-button" onClick={auth.signIn}>
                                        <p>Log In</p>
                                    </button>
                                )}
                            </>
                        )}
                    </div>
                </section>
            </div>
        </main>
    )
}

export default auth
