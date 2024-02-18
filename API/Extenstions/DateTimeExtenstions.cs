namespace API.Extenstions;

public static class DateTimeExtenstions
{
    public static int CalculateAge(this DateTime dob)
    {
        var today= DateTime.UtcNow;
        var age=today.Year-dob.Year;
        if (dob > today.AddYears(-age)) age--;
        return age;
    }
}
