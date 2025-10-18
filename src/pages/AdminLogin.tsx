import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { Lock } from "lucide-react";

const AdminLogin = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();
    const { toast } = useToast();

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        
        // Credenciais simples (ATENÇÃO: Não é seguro para produção!)
        if (username === "admin" && password === "admin123") {
            localStorage.setItem("adminAuth", "true");
            toast({
                title: "Login realizado!",
                description: "Bem-vindo ao painel admin.",
            });
            navigate("/admin");
        } else {
            toast({
                title: "Credenciais incorretas",
                description: "Usuário ou senha inválidos.",
                variant: "destructive",
            });
        }
    };

    return (
        <div className="min-h-screen bg-background flex items-center justify-center p-4">
            <Card className="w-full max-w-md">
                <CardHeader className="space-y-1 text-center">
                    <div className="flex justify-center mb-4">
                        <div className="bg-primary/10 p-3 rounded-full">
                            <Lock className="h-6 w-6 text-primary" />
                        </div>
                    </div>
                    <CardTitle className="text-2xl">Admin Login</CardTitle>
                    <CardDescription>
                        Digite a senha para acessar o painel
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div>
                            <Label htmlFor="username">Usuário</Label>
                            <Input
                                id="username"
                                type="text"
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                                placeholder="Digite seu usuário"
                                required
                            />
                        </div>
                        
                        <div>
                            <Label htmlFor="password">Senha</Label>
                            <Input
                                id="password"
                                type="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                placeholder="Digite a senha admin"
                                required
                            />
                        </div>
                        
                        <Button type="submit" className="w-full">
                            Entrar
                        </Button>
                        
                        <p className="text-xs text-muted-foreground text-center">
                            Usuário: admin | Senha: admin123
                        </p>
                    </form>
                </CardContent>
            </Card>
        </div>
    );
};

export default AdminLogin;