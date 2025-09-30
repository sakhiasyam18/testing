// src/app/page.tsx
import { Container } from "@/components/Container";
import { AHero } from "@/components/AHero";
import { BCaraMemesan } from "@/components/BCaraMemesan";
import { CPilihanSepeda } from "@/components/CPilihanSepeda";
import { Header } from "@/components/Header";
import { DMapAlamat } from "@/components/DMapAlamat";
import { EFooter } from "@/components/EFooter";
import { Button } from "@/components/ui/button";

export default function Home() {
  return (
    <>
      {/* ini header nya sticky */}
      <Header />

      <Container>
        {/* ini main ini body isi isi nya */}
        <main>
          <AHero />

          <BCaraMemesan />

          <CPilihanSepeda />

          <DMapAlamat />

          <div>
            <Button>
              Hai Cuma Tes oke berarti nyala css nya sudah berfungsi :D
            </Button>
          </div>
        </main>
      </Container>
      {/* ini footernya diluar main */}
      <EFooter />
    </>
  );
}
