declare module ClipperLib {

	export var biginteger_used: boolean;
	export function Math_Abs_Int64(a: number): number;
	export function Math_Abs_Int32(a: number): number;
	export function Math_Abs_Double(a: number): number;
	export function Math_Max_Int32_Int32(a: number, b: number): number;
	export function Cast_Int32(a: number): number;
	export function Cast_Int64(a: number): number;
	export function Clear(a): void;

	export const MaxSteps: number;
	export const PI: number;
	export const PI2: number;

	export class IntPoint {
		X: number;
		Y: number;
		constructor(PointXY: IntPoint);
		constructor(x: number, y: number)
	}

	export class IntRect {
		left: number;
		top: number;
		right: number;
		bottom: number;
		constructor();
		constructor(left: number, top: number,right:number,bottom:number);
	}

	export function Polygon ():ArrayLike<IntPoint>;

	export function Polygons(): ArrayLike<ArrayLike<IntPoint>>;

	export class ExPolygon{
		outer: ArrayLike<IntPoint>;
		holes: ArrayLike<ArrayLike<IntPoint>>;
	}

	export enum ClipType { ctIntersection, ctUnion, ctDifference, ctXor }
	export enum PolyType { ptSubject, ptClip }
	export enum PolyFillType { pftEvenOdd, pftNonZero, pftPositive, pftNegative }
	export enum JoinType { jtSquare, jtRound, jtMiter }
	export enum EdgeSide { esLeft, esRight }
	export enum Protects { ipNone, ipLeft, ipRight, ipBoth }
	export enum Direction { dRightToLeft, dLeftToRight }

	export class TEdge {
		xbot: number;
		ybot: number;
		xcurr: number;
		ycurr: number;
		xtop: number;
		ytop: number;
		dx: number;
		deltaX: number;
		deltaY: number;
		tmpX: number;
		polyType: PolyType;
		side: EdgeSide;
		windDelta: number;
		windCnt: number;
		windCnt2: number;
		outIdx: number;
		next: TEdge;
		prev: TEdge;
		nextInLML: TEdge;
		nextInAEL: TEdge;
		prevInAEL: TEdge;
		nextInSEL: TEdge;
		prevInSEL: TEdge;

	}
	export class IntersectNode {
		edge1: TEdge;
		edge2: TEdge;
		pt: TEdge;
		next: TEdge;
	}
	export class LocalMinima {
		Y: number;
		leftBound: TEdge;
		rightBound: TEdge;
		next: TEdge;
	}
	export class Scanbeam {
		Y: number;
		next: TEdge;
	}
	export class OutRec {
		idx: number;
		isHole: boolean;
		FirstLeft: TEdge;
		AppendLink: OutRec;
		pts: OutPt;
		bottomPt: OutPt;

	}
	export class OutPt{
		idx: number;
		pt: OutPt;
		next: OutPt;
		prev: OutPt;
	}
	export class JoinRec{
		pt1a : IntPoint;
		pt1b : IntPoint;
		poly1Idx: number;
		pt2a: IntPoint;
		pt2b: IntPoint;
		poly2Idx: number;
	}
	export class HorzJoinRec{
		edge: TEdge;
		savedIdx: number;
	}
	export class ClipperBase{
		m_MinimaList: LocalMinima;
		m_CurrentLM: LocalMinima;
		m_edges : ArrayLike<ArrayLike<TEdge>>;
		m_UseFullRange: boolean;
		horizontal: number;
		loRange: number;
		hiRange: number;

		PointsEqual(pt1: IntPoint, pt2: IntPoint): boolean;
		PointIsVertex(pt: IntPoint, pp: JoinRec): boolean;
		PointInPolygon(pt: IntPoint, pp: JoinRec, UseFulllongRange: boolean): boolean;
		SlopesEqual(e1: TEdge, e2: TEdge, UseFullRange: boolean);
		SlopesEqual(pt1: IntPoint, pt2: IntPoint, pt3: IntPoint, UseFullRange: boolean): boolean;
		SlopesEqual(pt1: IntPoint, pt2: IntPoint, pt3: IntPoint, pt4: IntPoint, UseFullRange: boolean): boolean;
		clear():void;
		DisposeLocalMinimaList(): void;
		AddPolygons(ppg: ArrayLike<ArrayLike<IntPoint>>, polyType: PolyType);
		AddPolygon(pg: ArrayLike<IntPoint>, polyType: PolyType, multiple: boolean): boolean | string;
		InitEdge(e: TEdge, eNext: TEdge, ePrev: TEdge, pt: IntPoint, polyType: PolyType): void;
		SetDx(e: TEdge): void;
		AddBoundsToLML(e: TEdge): TEdge;
		InsertLocalMinima(newLm: LocalMinima): void;
		PopLocalMinima(): void;
		SwapX(e: TEdge): void;
		Reset(): void;
		GetBounds(): IntRect;

	}
	export class Clipper extends ClipperBase{
		m_PolyOuts: TEdge | ArrayLike<TEdge>;
		m_ClipType: ClipType;
		m_Scanbeam: Scanbeam;
		m_ActiveEdges: TEdge;
		m_SortedEdges: TEdge;
		m_intersectnodes: IntersectNode;
		m_ExecuteLocked: boolean;
		m_ClipFillType: PolyFillType;
		m_SubjFillType: PolyFillType;
		m_Joins: ArrayLike<JoinRec>;
		m_HorizJoins: ArrayLike<HorzJoinRec>;
		m_ReverseOutput: boolean;
		m_UsingExPolygons: boolean;

		DisposeScanbeamList(): void;
		get_ReverseSolution(): boolean;
		set_ReverseSolution(value: boolean);
		InsertScanbeam(Y: number): void;
		Execute(clipType: ClipType, solution: ArrayLike<IntPoint> | ExPolygon ): boolean;
		Execute(clipType: ClipType, solution: ArrayLike<IntPoint> | ExPolygon, subjFillType: PolyFillType, clipFillType: PolyFillType): boolean;


	}

	

}