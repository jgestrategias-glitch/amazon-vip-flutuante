import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { toast } from "sonner";

interface ReservationModalProps {
  isOpen: boolean;
  onClose: () => void;
}

interface ReservationData {
  date: string;
  shift: "day_use" | "pernoite" | "";
  packageSize: 4 | 8 | 12 | 25 | null;
  suiteIncluded: boolean;
  name: string;
  email: string;
  phone: string;
}

const PACKAGE_PRICES: Record<4 | 8 | 12 | 25, number> = {
  4: 790,
  8: 1420,
  12: 1550,
  25: 2300,
};

const SUITE_PRICE = 200;

const UNAVAILABLE_DATES = [
  "2026-02-25",
  "2026-02-26",
  "2026-03-01",
  "2026-03-05",
  "2026-03-10",
];

export default function ReservationModal({
  isOpen,
  onClose,
}: ReservationModalProps) {
  const [step, setStep] = useState<1 | 2 | 3 | 4 | 5>(1);
  const [data, setData] = useState<ReservationData>({
    date: "",
    shift: "",
    packageSize: null,
    suiteIncluded: false,
    name: "",
    email: "",
    phone: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const calculateTotal = (): number => {
    let total = 0;
    if (data.packageSize) {
      total += PACKAGE_PRICES[data.packageSize];
    }
    if (data.suiteIncluded && data.shift === "day_use") {
      total += SUITE_PRICE;
    }
    return total;
  };

  const isDateAvailable = (dateStr: string): boolean => {
    return !UNAVAILABLE_DATES.includes(dateStr);
  };

  const handleDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedDate = e.target.value;
    if (isDateAvailable(selectedDate)) {
      setData({ ...data, date: selectedDate });
    } else {
      toast.error("Esta data não está disponível. Por favor, escolha outra.");
    }
  };

  const handleShiftSelect = (shift: "day_use" | "pernoite") => {
    setData({
      ...data,
      shift,
      suiteIncluded: shift === "pernoite" ? true : false,
    });
  };

  const handlePackageSelect = (size: 4 | 8 | 12 | 25) => {
    setData({ ...data, packageSize: size });
  };

  const handleSuiteToggle = () => {
    if (data.shift === "day_use") {
      setData({ ...data, suiteIncluded: !data.suiteIncluded });
    }
  };

  const handleSubmit = async () => {
    if (!data.name || !data.email || !data.phone) {
      toast.error("Por favor, preencha todos os campos.");
      return;
    }

    setIsSubmitting(true);
    try {
      await new Promise((resolve) => setTimeout(resolve, 1500));

      const bookings = JSON.parse(localStorage.getItem("bookings") || "[]");
      const newBooking = {
        id: Date.now().toString(),
        customer_name: data.name,
        customer_email: data.email,
        customer_phone: data.phone,
        booking_date: data.date,
        shift: data.shift,
        package_size: data.packageSize,
        suite_included: data.suiteIncluded,
        total_price: calculateTotal(),
        status: "pending",
        created_at: new Date().toISOString(),
      };
      bookings.push(newBooking);
      localStorage.setItem("bookings", JSON.stringify(bookings));

      toast.success(
        "Reserva solicitada com sucesso! Entraremos em contato em breve."
      );
      setStep(1);
      setData({
        date: "",
        shift: "",
        packageSize: null,
        suiteIncluded: false,
        name: "",
        email: "",
        phone: "",
      });
      onClose();
    } catch (error) {
      toast.error("Erro ao processar a reserva. Tente novamente.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const canProceedToStep2 = data.date && isDateAvailable(data.date);
  const canProceedToStep3 = canProceedToStep2 && data.shift;
  const canProceedToStep4 = canProceedToStep3 && data.packageSize;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl font-serif font-bold text-[#1B4D3E]">
            {step === 1 && "Escolha a Data"}
            {step === 2 && "Selecione o Turno"}
            {step === 3 && "Escolha o Pacote"}
            {step === 4 && "Suíte Exclusiva"}
            {step === 5 && "Seus Dados"}
          </DialogTitle>
        </DialogHeader>

        <div className="mt-6">
          {step === 1 && (
            <div className="space-y-4">
              <p className="text-gray-600 mb-4">
                Selecione a data desejada para sua reserva:
              </p>
              <div>
                <Label htmlFor="date" className="text-base font-semibold">
                  Data
                </Label>
                <Input
                  id="date"
                  type="date"
                  value={data.date}
                  onChange={handleDateChange}
                  className="mt-2"
                  min={new Date().toISOString().split("T")[0]}
                />
              </div>
              {data.date && isDateAvailable(data.date) && (
                <p className="text-green-600 text-sm">✓ Data disponível</p>
              )}
              <div className="flex gap-3 mt-6">
                <Button
                  onClick={onClose}
                  variant="outline"
                  className="flex-1"
                >
                  Cancelar
                </Button>
                <Button
                  onClick={() => setStep(2)}
                  disabled={!canProceedToStep2}
                  className="flex-1 bg-[#1B4D3E] text-white hover:bg-[#2D6A54]"
                >
                  Próximo
                </Button>
              </div>
            </div>
          )}

          {step === 2 && (
            <div className="space-y-4">
              <p className="text-gray-600 mb-4">
                Qual turno você prefere?
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <button
                  onClick={() => handleShiftSelect("day_use")}
                  className={`p-6 border-2 rounded-sm transition-all duration-300 text-left ${
                    data.shift === "day_use"
                      ? "border-[#1B4D3E] bg-[#1B4D3E]/5"
                      : "border-gray-300 hover:border-[#1B4D3E]"
                  }`}
                >
                  <h3 className="font-bold text-lg text-[#1B4D3E] mb-2">
                    Day Use
                  </h3>
                  <p className="text-gray-600 text-sm">09:00 às 18:00</p>
                </button>

                <button
                  onClick={() => handleShiftSelect("pernoite")}
                  className={`p-6 border-2 rounded-sm transition-all duration-300 text-left ${
                    data.shift === "pernoite"
                      ? "border-[#1B4D3E] bg-[#1B4D3E]/5"
                      : "border-gray-300 hover:border-[#1B4D3E]"
                  }`}
                >
                  <h3 className="font-bold text-lg text-[#1B4D3E] mb-2">
                    Pernoite
                  </h3>
                  <p className="text-gray-600 text-sm">20:00 às 07:00</p>
                </button>
              </div>
              <div className="flex gap-3 mt-6">
                <Button
                  onClick={() => setStep(1)}
                  variant="outline"
                  className="flex-1"
                >
                  Voltar
                </Button>
                <Button
                  onClick={() => setStep(3)}
                  disabled={!canProceedToStep3}
                  className="flex-1 bg-[#1B4D3E] text-white hover:bg-[#2D6A54]"
                >
                  Próximo
                </Button>
              </div>
            </div>
          )}

          {step === 3 && (
            <div className="space-y-4">
              <p className="text-gray-600 mb-4">
                Escolha o pacote (quantidade de pessoas):
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {[
                  { size: 4 as const, price: 790 },
                  { size: 8 as const, price: 1420 },
                  { size: 12 as const, price: 1550 },
                  { size: 25 as const, price: 2300 },
                ].map(({ size, price }) => (
                  <button
                    key={size}
                    onClick={() => handlePackageSelect(size)}
                    className={`p-6 border-2 rounded-sm transition-all duration-300 text-left ${
                      data.packageSize === size
                        ? "border-[#1B4D3E] bg-[#1B4D3E]/5"
                        : "border-gray-300 hover:border-[#1B4D3E]"
                    }`}
                  >
                    <h3 className="font-bold text-lg text-[#1B4D3E] mb-2">
                      {size} pessoas
                    </h3>
                    <p className="text-[#D4AF37] font-bold text-lg">
                      R$ {price.toLocaleString("pt-BR")}
                    </p>
                  </button>
                ))}
              </div>
              <div className="flex gap-3 mt-6">
                <Button
                  onClick={() => setStep(2)}
                  variant="outline"
                  className="flex-1"
                >
                  Voltar
                </Button>
                <Button
                  onClick={() => setStep(4)}
                  disabled={!canProceedToStep4}
                  className="flex-1 bg-[#1B4D3E] text-white hover:bg-[#2D6A54]"
                >
                  Próximo
                </Button>
              </div>
            </div>
          )}

          {step === 4 && (
            <div className="space-y-4">
              {data.shift === "day_use" ? (
                <>
                  <p className="text-gray-600 mb-4">
                    Deseja adicionar a Suíte Exclusiva?
                  </p>
                  <div className="bg-[#F5F1E8] p-6 rounded-sm mb-4">
                    <div className="flex items-center gap-4">
                      <Checkbox
                        id="suite"
                        checked={data.suiteIncluded}
                        onCheckedChange={handleSuiteToggle}
                      />
                      <div className="flex-1">
                        <Label
                          htmlFor="suite"
                          className="text-base font-semibold cursor-pointer"
                        >
                          Adicionar Suíte Exclusiva
                        </Label>
                        <p className="text-sm text-gray-600 mt-1">
                          + R$ {SUITE_PRICE.toLocaleString("pt-BR")}
                        </p>
                      </div>
                    </div>
                  </div>
                </>
              ) : (
                <div className="bg-green-50 border border-green-200 p-6 rounded-sm">
                  <p className="text-green-800 font-semibold">
                    ✓ Suíte Exclusiva já inclusa no pacote!
                  </p>
                  <p className="text-sm text-green-700 mt-2">
                    Aproveite o conforto total durante sua pernoite.
                  </p>
                </div>
              )}
              <div className="flex gap-3 mt-6">
                <Button
                  onClick={() => setStep(3)}
                  variant="outline"
                  className="flex-1"
                >
                  Voltar
                </Button>
                <Button
                  onClick={() => setStep(5)}
                  className="flex-1 bg-[#1B4D3E] text-white hover:bg-[#2D6A54]"
                >
                  Próximo
                </Button>
              </div>
            </div>
          )}

          {step === 5 && (
            <div className="space-y-4">
              <p className="text-gray-600 mb-4">
                Preencha seus dados para finalizar a reserva:
              </p>

              <div className="bg-[#F5F1E8] p-4 rounded-sm mb-6">
                <h4 className="font-bold text-[#1B4D3E] mb-3">Resumo</h4>
                <div className="space-y-2 text-sm">
                  <p>
                    <span className="font-semibold">Data:</span>{" "}
                    {new Date(data.date).toLocaleDateString("pt-BR")}
                  </p>
                  <p>
                    <span className="font-semibold">Turno:</span>{" "}
                    {data.shift === "day_use" ? "Day Use (09:00-18:00)" : "Pernoite (20:00-07:00)"}
                  </p>
                  <p>
                    <span className="font-semibold">Pacote:</span> {data.packageSize} pessoas
                  </p>
                  {data.suiteIncluded && (
                    <p>
                      <span className="font-semibold">Suíte:</span> Inclusa
                    </p>
                  )}
                  <div className="border-t border-gray-300 pt-2 mt-2">
                    <p className="font-bold text-lg text-[#D4AF37]">
                      Total: R$ {calculateTotal().toLocaleString("pt-BR")}
                    </p>
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <div>
                  <Label htmlFor="name" className="text-base font-semibold">
                    Nome Completo
                  </Label>
                  <Input
                    id="name"
                    value={data.name}
                    onChange={(e) => setData({ ...data, name: e.target.value })}
                    className="mt-2"
                    placeholder="Seu nome"
                  />
                </div>

                <div>
                  <Label htmlFor="email" className="text-base font-semibold">
                    Email
                  </Label>
                  <Input
                    id="email"
                    type="email"
                    value={data.email}
                    onChange={(e) => setData({ ...data, email: e.target.value })}
                    className="mt-2"
                    placeholder="seu@email.com"
                  />
                </div>

                <div>
                  <Label htmlFor="phone" className="text-base font-semibold">
                    Telefone
                  </Label>
                  <Input
                    id="phone"
                    value={data.phone}
                    onChange={(e) => setData({ ...data, phone: e.target.value })}
                    className="mt-2"
                    placeholder="(92) 98453-5475"
                  />
                </div>
              </div>

              <div className="flex gap-3 mt-6">
                <Button
                  onClick={() => setStep(4)}
                  variant="outline"
                  className="flex-1"
                >
                  Voltar
                </Button>
                <Button
                  onClick={handleSubmit}
                  disabled={isSubmitting}
                  className="flex-1 bg-[#1B4D3E] text-white hover:bg-[#2D6A54]"
                >
                  {isSubmitting ? "Processando..." : "Finalizar Reserva"}
                </Button>
              </div>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}
