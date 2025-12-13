interface Props {
    heading?: string,
    showLogo?: string
}

export default function AuthContainer(props: React.PropsWithChildren<Props>) {
    return (
        <div className="flex items-center justify-center min-h-screen">
            <div className="py-8 px-8 bg-white space-y-4 min-w-sm">
                <div>
                    {props.heading && <h2 className="font-bold text-center">{props.heading}</h2>}
                </div>
                <div>
                    {props.children}
                </div>
            </div>
        </div>
    )
}