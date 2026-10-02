import { EquipmentDetail } from "@/features/equipment/equipment-detail"

export default async function EquipmentDetailPage({ params }: { params: Promise<{ equipmentId: string }> }) {
  const { equipmentId } = await params
  return <EquipmentDetail equipmentId={equipmentId} />
}
