// Vector copies of the blocks beside the laptop, traced from the flat artwork (1016×718
// art space). Listed back-to-front; `drop` is the order they fall in. During the drop these
// stand in for the artwork's blocks, which fade back in once the stack is complete.

export type Block = {
    id: string
    drop: number
    faces: string[]
    circle?: { cx: number; cy: number; r: number }
    shades: string[]
    lines: string[]
}

export const BLOCKS: Block[] = [
    {
        id: 'tent',
        drop: 2,
        faces: ['903,588 872,621 925,640'],
        shades: ['880,607 924,607 928,617 876,617'],
        lines: ['890,604.5 912,604.5'],
    },
    {
        id: 'pyramid',
        drop: 1,
        faces: [
            '835.8,603.8 845.5,600.8 860.5,612 860.5,650 837,676.8',
            '781.3,665.8 835.8,603.8 837,676.8',
        ],
        shades: ['781.3,665.8 826,628 837,676.8'],
        lines: [],
    },
    {
        id: 'ball',
        drop: 4,
        faces: [],
        circle: { cx: 908, cy: 554.3, r: 30.5 },
        shades: ['872,538 880,590 940,590 934,578 905,565 885,545'],
        lines: [],
    },
    {
        id: 'triangle',
        drop: 5,
        faces: ['818.8,581.3 875,542.5 872.5,620'],
        shades: ['822,581 872.5,620 873.5,572'],
        lines: [],
    },
    {
        id: 'prism',
        drop: 3,
        faces: [
            '903.8,586.3 926.3,577.5 975,668.8 953,679.3',
            '926.3,577.5 949.3,567.5 990,642.5 975,668.8',
        ],
        shades: ['903.8,586.3 926.3,577.5 975,668.8 953,679.3'],
        lines: [],
    },
    {
        id: 'cube',
        drop: 2,
        faces: [
            '856.3,632.5 873,619.5 904.5,616.5 923.8,632.5',
            '856.3,632.5 923.8,632.5 923.8,690 856.3,690',
        ],
        shades: ['856.3,638 856.3,690 910,690'],
        lines: [],
    },
]
