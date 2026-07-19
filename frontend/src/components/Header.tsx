import Link from "next/link";

const Header = () => {
    return (
        <header>
            <Link href="/">
                Tasks
            </Link>
            <Link href="/tasks/create">
                Create task
            </Link>
        </header>
    )
}

export {
    Header
}