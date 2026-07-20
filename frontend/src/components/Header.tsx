import Link from "next/link";
import { Button } from "@/src/components/ui/button";

const Header = () => {
    return (
        <header className="flex items-center justify-between px-2 py-2 border-b bg-[var(--app-accent)]">
            <Button 
                variant="link"
                className="!text-[var(--app-text)]"
            >
                <Link href="/">
                    Tasks
                </Link>
            </Button>
            <Button 
                variant="link"
                className="!text-[var(--app-text)]"
            >
                <Link href="/tasks/create">
                    Create task
                </Link>
            </Button>
        </header>
    )
}

export {
    Header
}