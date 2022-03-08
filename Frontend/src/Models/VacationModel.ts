class VacationModel {

    public id: number;
    public description: string;
    public destination: string;
    public arrival: string;
    public departure: string;
    public price: number;
    public followersNumber: number;
    public imageName: string;
    public image: FileList;

    public static convertToFormData(vacation: VacationModel): FormData {
        const myFormData = new FormData();
        myFormData.append("destination", vacation.destination);
        myFormData.append("description", vacation.description);
        myFormData.append("arrival", vacation.arrival);
        myFormData.append("departure", vacation.departure);
        myFormData.append("price", vacation.price.toString());
        // myFormData.append("followersNumber", vacation.followersNumber.toString());
        myFormData.append("image", vacation.image.item(0));
        return myFormData;
    }
}

export default VacationModel;