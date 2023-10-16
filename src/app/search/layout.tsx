import SearchField from "@/components/searchField"


export default function SearchLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return (
        <div>
            <div className="mt-12 bg-gradient-to-r from-indigo-950 to-indigo-700 h-48 w-full flex flex-col items-center justify-center">
            <h1 className="text-4xl text-white pb-5">Find your table for any occasion</h1>
                <SearchField />
            </div>
            <div className="flex">

                <div > {children}</div>

            </div>

        </div>




    )
}
