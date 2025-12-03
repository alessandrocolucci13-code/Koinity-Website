import { useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { LogOut, Download, Eye } from "lucide-react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import type { DemoRequestRecord } from "@shared/schema";

const adminPasswordSchema = z.object({
  password: z.string().min(1, "Password richiesta"),
});

type AdminPassword = z.infer<typeof adminPasswordSchema>;

const ADMIN_PASSWORD = "admin123"; // In production, use environment variables

export default function AdminDashboard() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [selectedRequest, setSelectedRequest] = useState<DemoRequestRecord | null>(null);

  const form = useForm<AdminPassword>({
    resolver: zodResolver(adminPasswordSchema),
    defaultValues: { password: "" },
  });

  // Check if already authenticated
  useEffect(() => {
    const authToken = localStorage.getItem("adminAuth");
    if (authToken === "true") {
      setIsAuthenticated(true);
    }
  }, []);

  const { data: demoRequests = [], isLoading } = useQuery({
    queryKey: ["/api/demo-request"],
    enabled: isAuthenticated,
  });

  const handleLogin = (data: AdminPassword) => {
    if (data.password === ADMIN_PASSWORD) {
      localStorage.setItem("adminAuth", "true");
      setIsAuthenticated(true);
      form.reset();
    } else {
      form.setError("password", { message: "Password non corretta" });
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("adminAuth");
    setIsAuthenticated(false);
    form.reset();
  };

  const downloadCSV = () => {
    const headers = ["ID", "Nome", "Email", "Cinema", "Città", "Data Richiesta"];
    const rows = demoRequests.map((req) => [
      req.id,
      req.name,
      req.email,
      req.cinemaNome,
      req.città,
      new Date(req.createdAt).toLocaleString("it-IT"),
    ]);

    let csv = headers.join(",") + "\n";
    rows.forEach((row) => {
      csv += row.map((cell) => `"${cell}"`).join(",") + "\n";
    });

    const blob = new Blob([csv], { type: "text/csv" });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `demo-requests-${new Date().toISOString().split("T")[0]}.csv`;
    document.body.appendChild(a);
    a.click();
    window.URL.revokeObjectURL(url);
    document.body.removeChild(a);
  };

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center p-4">
        <Card className="w-full max-w-md">
          <CardHeader>
            <CardTitle>Admin Dashboard</CardTitle>
            <CardDescription>Accedi alla dashboard amministrativa</CardDescription>
          </CardHeader>
          <CardContent>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(handleLogin)} className="space-y-4">
                <FormField
                  control={form.control}
                  name="password"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Password</FormLabel>
                      <FormControl>
                        <Input
                          type="password"
                          placeholder="Inserisci password"
                          {...field}
                          data-testid="input-admin-password"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <Button type="submit" className="w-full" data-testid="button-admin-login">
                  Accedi
                </Button>
              </form>
            </Form>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-foreground">Admin Dashboard</h1>
            <p className="text-secondary-foreground mt-1">
              Gestisci le richieste di demo da Koinity Cinema
            </p>
          </div>
          <Button
            variant="outline"
            onClick={handleLogout}
            data-testid="button-admin-logout"
          >
            <LogOut className="w-4 h-4 mr-2" />
            Esci
          </Button>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-secondary-foreground">
                Totale Richieste
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{demoRequests.length}</div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-secondary-foreground">
                Ultime 24 ore
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {demoRequests.filter((r) => {
                  const date = new Date(r.createdAt);
                  const now = new Date();
                  return (now.getTime() - date.getTime()) < 24 * 60 * 60 * 1000;
                }).length}
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-secondary-foreground">
                Azioni
              </CardTitle>
            </CardHeader>
            <CardContent>
              <Button
                size="sm"
                variant="default"
                onClick={downloadCSV}
                data-testid="button-download-csv"
              >
                <Download className="w-4 h-4 mr-2" />
                Esporta CSV
              </Button>
            </CardContent>
          </Card>
        </div>

        {/* Requests Table */}
        <Card>
          <CardHeader>
            <CardTitle>Richieste di Demo</CardTitle>
            <CardDescription>
              Elenco di tutte le richieste di demo ricevute
            </CardDescription>
          </CardHeader>
          <CardContent>
            {isLoading ? (
              <div className="text-center py-8 text-secondary-foreground">
                Caricamento in corso...
              </div>
            ) : demoRequests.length === 0 ? (
              <div className="text-center py-8 text-secondary-foreground">
                Nessuna richiesta di demo trovata
              </div>
            ) : (
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Nome</TableHead>
                      <TableHead>Email</TableHead>
                      <TableHead>Cinema</TableHead>
                      <TableHead>Città</TableHead>
                      <TableHead>Data</TableHead>
                      <TableHead>Azioni</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {demoRequests.map((request) => (
                      <TableRow key={request.id}>
                        <TableCell className="font-medium">{request.name}</TableCell>
                        <TableCell>{request.email}</TableCell>
                        <TableCell>{request.cinemaNome}</TableCell>
                        <TableCell>{request.città}</TableCell>
                        <TableCell className="text-secondary-foreground text-sm">
                          {new Date(request.createdAt).toLocaleString("it-IT")}
                        </TableCell>
                        <TableCell>
                          <Button
                            size="sm"
                            variant="ghost"
                            onClick={() => setSelectedRequest(request)}
                            data-testid={`button-view-${request.id}`}
                          >
                            <Eye className="w-4 h-4" />
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Detail Dialog */}
      <Dialog open={!!selectedRequest} onOpenChange={(open) => !open && setSelectedRequest(null)}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Dettagli Richiesta di Demo</DialogTitle>
            <DialogDescription>
              Informazioni complete della richiesta di demo
            </DialogDescription>
          </DialogHeader>
          {selectedRequest && (
            <div className="space-y-4">
              <div>
                <label className="text-sm font-medium text-secondary-foreground">Nome</label>
                <p className="text-foreground mt-1">{selectedRequest.name}</p>
              </div>
              <div>
                <label className="text-sm font-medium text-secondary-foreground">Email</label>
                <p className="text-foreground mt-1">
                  <a
                    href={`mailto:${selectedRequest.email}`}
                    className="text-primary hover:underline"
                  >
                    {selectedRequest.email}
                  </a>
                </p>
              </div>
              <div>
                <label className="text-sm font-medium text-secondary-foreground">
                  Nome Cinema
                </label>
                <p className="text-foreground mt-1">{selectedRequest.cinemaNome}</p>
              </div>
              <div>
                <label className="text-sm font-medium text-secondary-foreground">Città</label>
                <p className="text-foreground mt-1">{selectedRequest.città}</p>
              </div>
              {selectedRequest.message && (
                <div>
                  <label className="text-sm font-medium text-secondary-foreground">
                    Messaggio
                  </label>
                  <p className="text-foreground mt-1">{selectedRequest.message}</p>
                </div>
              )}
              <div>
                <label className="text-sm font-medium text-secondary-foreground">
                  Data Richiesta
                </label>
                <p className="text-foreground mt-1">
                  {new Date(selectedRequest.createdAt).toLocaleString("it-IT")}
                </p>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
