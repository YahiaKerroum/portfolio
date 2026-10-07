import Link from "next/link";
import Header from "@/components/Header";
import Icon from "@/components/Icon";

export default function NotFound() {
  return (
    <>
      <Header />
      <main id="top" className="lost">
        <h1 className="lost__title">Nothing here.</h1>
        <p>This page doesn&rsquo;t exist, or it moved. The work is all on the home page.</p>
        <Link className="arrow-link" href="/#work">
          See the work <Icon name="right" />
        </Link>
      </main>
    </>
  );
}
