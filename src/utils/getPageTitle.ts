import i18n from "@/language";

const title = i18n.t(`header.title`); // 光储设备管理系统

export default function getPageTitle(pageTitle: string) {
  if (pageTitle) {
    return `${pageTitle} - ${title}`;
  }
  return `${title}`;
}
