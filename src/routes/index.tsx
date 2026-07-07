import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/')({
    component: () => <IndexComponent />,
})

const IndexComponent = () => {
    return (
        <div className="p-2">
            <h3 className="text-4xl font-bold text-center">Welcome Home!</h3>
        </div>
    )
}
